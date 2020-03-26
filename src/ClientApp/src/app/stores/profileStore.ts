import {RootStore} from "./rootStore";
import {action, computed, observable, runInAction} from "mobx";
import {IPhoto, IProfile} from "../models/profile";
import agent from "../api/agent";
import {toast} from "react-toastify";

export default class ProfileStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable profile: IProfile | null = null;
  @observable loadingProfile = true;
  @observable uploadingPhoto = false;
  @observable loading = false;

  @computed get isCurrentUser() {
    if (this.rootStore.userStore.user && this.profile)
      return this.rootStore.userStore.user.username === this.profile.username;
    return false;
  }

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
}