import {action, computed, configure, observable, runInAction} from 'mobx';
import {createContext} from "react";
import {IActivity} from "app/models/activity";
import agent from "app/api/agent";

configure({enforceActions: "always"});

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined;
  @observable loadingInitial = true;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = '';

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      ((a, b) => Date.parse(a.date) - Date.parse(b.date))
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction('loading activities', () => {
        this.activities = activities;
        activities.map(a => this.activityRegistry.set(a.id, a));
      });
    } catch (e) {
      console.log(e);
    } finally {
      runInAction('clean up', () => {
        this.loadingInitial = false
      });
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      this.setEditMode(true);
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
      });
    } catch (e) {
      console.log(e);
    } finally {
      runInAction(() => {
        this.editMode = false;
        this.submitting = false;
      });
    }
  };

  @action openCrateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };

  @action editActivity = async (activity: IActivity) => {
    this.target = activity.id;
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
      });
    } catch (e) {
      console.log(e);
    } finally {
      runInAction(() => {
        this.editMode = false;
        this.submitting = false;
      });
    }
  };

  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action deleteActivity = async (id: string) => {
    this.target = id;
    this.submitting = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.selectedActivity = undefined;
      });
    } catch (e) {
      console.log(e);
    } finally {
      runInAction(() => {
        this.editMode = false;
        this.submitting = false;
      });
    }
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };

  @action setEditMode = (editMode: boolean) => {
    this.editMode = editMode;
  }
}

export default createContext(new ActivityStore());