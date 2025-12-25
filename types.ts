
export interface Question {
  id: string;
  text: string;
  answer: string;
  points: number;
  questionImageUrl?: string;
  answerImageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  questions: Question[];
  price?: number;
  isOwned?: boolean;
}

export interface Team {
  name: string;
  score: number;
}

export interface GameHistoryItem {
  id: string;
  date: string;
  teams: [Team, Team];
  winner: string | 'تعادل';
  userEmail?: string; // Track which user played the game
}

export interface GameState {
  selectedCategories: Category[];
  teams: [Team, Team];
  answeredQuestionIds: string[];
  activeQuestion: { categoryId: string; questionId: string } | null;
  currentTurnIndex: number;
}

export interface User {
  name: string;
  email: string;
  password?: string; // Added password field
  isLoggedIn: boolean;
  balance: number;
  usedQuestionIds: string[];
  role: 'user' | 'admin'; // Added role field
}

export type View = 'LOGIN' | 'HOME' | 'DASHBOARD' | 'GAME_SETUP' | 'GAME_PLAY' | 'SHOP' | 'HISTORY';
