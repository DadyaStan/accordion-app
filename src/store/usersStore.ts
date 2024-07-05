import { defineStore } from 'pinia';
import axios from 'axios';

interface UsersState {
  users: any[];
  loading: boolean;
  error: any | null;
}

export const useUsersStore = defineStore({
  id: 'users',
  state: (): UsersState => ({
    users: [],
    loading: false,
    error: null
  }),
  getters: {
    getUsers(state): any[] {
      return state.users;
    }
  },
  actions: {
    async fetchUsers(this): Promise<any[]> { 
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get<any[]>('https://jsonplaceholder.typicode.com/users');
        this.users = response.data;
        return this.users;
      } catch (error) {
        console.error('Error fetching users:', error);
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});

