import {RootStore} from "./rootStore";
import {action, computed, observable, reaction, runInAction} from "mobx";
import {IPhoto, IProfile} from "../models/profile";
import agent from "../api/agent";
import {toast} from "react-toastify";

export default class ProfileStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.activeTab,
      activeTab => {
        if (activeTab === 3 || activeTab === 4) {
          const predicate = activeTab === 3 ? 'followers' : 'following';
          this.loadFollowings(predicate);
        } else {
          this.followings = [];
        }
      }
    )
  }

  @observable profile: IProfile | null = null;
  @observable loadingProfile = true;
  @observable uploadingPhoto = false;
  @observable loading = false;
  @observable followings: IProfile[] = [];
  @observable activeTab: number = 0;

  @computed get isCurrentUser() {
    if (this.rootStore.userStore.user && this.profile)
      return this.rootStore.userStore.user.username === this.profile.username;
    return false;
  }

  @action setActiveTab = (activeIndex: number): void => {
    this.activeTab = activeIndex;
  };

  @action loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profile.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (e) {
      runInAction(() => {
        this.loadingProfile = false;
      });
      console.log(e);
    }
  };

  @action uploadPhoto = async (file: Blob) => {
    this.uploadingPhoto = true;
    try {
      const photo = await agent.Profile.uploadPhoto(file);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos.push(photo);
          if (photo.isMain && this.rootStore.userStore.user) {
            this.rootStore.userStore.user.image = photo.url;
            this.profile.image = photo.url;
          }
        }
        this.uploadingPhoto = false;
      });
    } catch (e) {
      console.log(e);
      toast.error('Problem uploading photo');
      runInAction(() => {
        this.uploadingPhoto = false;
      });
    }
  };

  @action updateProfile = async (profile: Partial<IProfile>) => {
    this.loading = true;
    try {
      await agent.Profile.update(profile);
      runInAction(() => {
        this.rootStore.userStore.user!.displayName = profile.displayName || this.rootStore.userStore.user!.displayName;
        this.profile = {...this.profile!, ...profile};
        this.loading = false;
      });
    } catch (e) {
      console.log(e);
      toast.error('Problem updating profile');
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action setMainPhoto = async (photo: IPhoto) => {
    this.loading = true;
    if (photo.isMain) return;
    try {
      await agent.Profile.setMainPhoto(photo.id);
      runInAction(() => {
        this.rootStore.userStore.user!.image = photo.url;
        this.profile!.photos.find(a => a.isMain)!.isMain = false;
        this.profile!.photos.find(a => a.id === photo.id)!.isMain = true;
        this.profile!.image = photo.url;
        this.loading = false;
      });
    } catch (e) {
      console.log(e);
      toast.error('Problem setting main photo');
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action deletePhoto = async (photo: IPhoto) => {
    this.loading = true;
    if (photo.isMain) return;
    try {
      await agent.Profile.deletePhoto(photo.id);
      runInAction(() => {
        this.profile!.photos = this.profile!.photos.filter(p => p.id !== photo.id);
        this.loading = false;
      });
    } catch (e) {
      console.log(e);
      toast.error('Problem deleting the photo');
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action follow = async (username: string) => {
    this.loading = true;
    try {
      await agent.Profile.follow(username);

      runInAction(() => {
        this.profile!.following = true;
        this.profile!.followersCount++;
        this.loading = false;
      });
    } catch (e) {
      toast.error('Problem following user');
      runInAction(() => this.loading = false);
    }
  };

  @action unFollow = async (username: string) => {
    this.loading = true;
    try {
      await agent.Profile.unFollow(username);

      runInAction(() => {
        this.profile!.following = false;
        this.profile!.followersCount--;
        this.loading = false;
      });
    } catch (e) {
      toast.error('Problem un-following user');
      runInAction(() => this.loading = false);
    }
  };

  @action loadFollowings = async (predicate: string) => {
    this.loading = true;
    try {
      const profiles = await agent.Profile.listFollowings(this.profile!.username, predicate);

      runInAction(() => {
        this.followings = profiles;
        runInAction(() => this.loading = false);
      });
    } catch (e) {
      toast.error('Problem loading followings');
      runInAction(() => this.loading = false);
    }
  };
}