import { Repository } from "../models/repository.model";
import { User } from "../models/user.model";

// app.state.ts
export interface AppState {
    token: string | null;
    user: User | null;
    repositories: Repository[];
    error: any;
    loading: any;
  }
  