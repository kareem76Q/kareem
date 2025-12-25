
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';
import { GameSetup } from './components/GameSetup';
import { GamePlay } from './components/GamePlay';
import { Shop } from './components/Shop';
import { History } from './components/History';
import { User, View, Category, GameState, GameHistoryItem, Question } from './types';
import { INITIAL_CATEGORIES } from './constants';

const GAME_SESSION_COST = 3; 
const ADMIN_EMAIL = 'kareemagbarih123@gamil.com';

const App = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('quiz_all_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('quiz_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [currentView, setView] = useState<View>(user ? 'HOME' : 'LOGIN');
  
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('quiz_categories');
    if (saved) return JSON.parse(saved);
    return INITIAL_CATEGORIES.map((cat) => ({
      ...cat,
      price: cat.price || 3,
      isOwned: true
    }));
  });

  const [history, setHistory] = useState<GameHistoryItem[]>(() => {
    const saved = localStorage.getItem('quiz_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    localStorage.setItem('quiz_all_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('quiz_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('quiz_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('quiz_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('quiz_user');
    }
  }, [user]);

  const handleLogin = (name: string, email: string, isSignUp: boolean, password?: string) => {
    if (isSignUp) {
      const exists = users.find(u => u.email === email);
      if (exists) {
        alert('هذا البريد الإلكتروني مسجل مسبقاً!');
        return;
      }
      
      const isInitialAdmin = email === ADMIN_EMAIL;
      const initialBalance = isInitialAdmin ? 15 : 3;
      
      const newUser: User = { 
        name, 
        email, 
        password,
        isLoggedIn: true, 
        balance: initialBalance, 
        usedQuestionIds: [],
        role: isInitialAdmin ? 'admin' : 'user'
      };
      setUsers(prev => [...prev, newUser]);
      setUser(newUser);
    } else {
      const found = users.find(u => u.email === email);
      if (!found) {
        alert('البريد الإلكتروني غير موجود! يرجى إنشاء حساب.');
        return;
      }
      if (password && found.password && found.password !== password) {
        alert('كلمة المرور غير صحيحة!');
        return;
      }
      setUser({ ...found, isLoggedIn: true });
    }
    setView('HOME');
  };

  const handleLogout = () => {
    setUser(null);
    setView('LOGIN');
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const pickQuestionsByPoints = (allQuestions: Question[], usedIds: string[], pointValue: number, count: number): Question[] => {
    const candidates = allQuestions.filter(q => q.points === pointValue);
    const unused = candidates.filter(q => !usedIds.includes(q.id));
    const shuffledUnused = shuffleArray(unused);
    let selected = shuffledUnused.slice(0, count);
    
    if (selected.length < count) {
      const used = shuffleArray(candidates.filter(q => usedIds.includes(q.id)));
      selected = [...selected, ...used.slice(0, count - selected.length)];
    }
    return selected;
  };

  const startGame = (setupState: GameState) => {
    if (!user || user.balance < GAME_SESSION_COST) {
      setView('SHOP');
      return;
    }

    const processedCategories = setupState.selectedCategories.map(cat => {
      const q200 = pickQuestionsByPoints(cat.questions, user.usedQuestionIds, 200, 2);
      const q400 = pickQuestionsByPoints(cat.questions, user.usedQuestionIds, 400, 2);
      const q600 = pickQuestionsByPoints(cat.questions, user.usedQuestionIds, 600, 2);
      const finalQuestions = [...q200, ...q400, ...q600];
      return { ...cat, questions: finalQuestions };
    });

    const updatedUser = { ...user, balance: Number(user.balance) - GAME_SESSION_COST };
    handleUpdateUser(updatedUser);
    setGameState({ ...setupState, selectedCategories: processedCategories, currentTurnIndex: 0 });
    setView('GAME_PLAY');
  };

  const handleUpdateUser = (updatedUser: User) => {
    // 1. Update global users list
    setUsers(prev => {
      const updatedList = prev.map(u => u.email === updatedUser.email ? updatedUser : u);
      // Ensure if user wasn't in list (unlikely), they are added
      if (!updatedList.find(u => u.email === updatedUser.email)) {
        return [...updatedList, updatedUser];
      }
      return updatedList;
    });
    
    // 2. Update active session user if emails match
    if (user?.email === updatedUser.email) {
      setUser(updatedUser);
    }
  };

  const handleBalancePurchase = (gamesAmount: number, cost: number) => {
    if (!user) return;
    const updatedUser = { ...user, balance: Number(user.balance) + (gamesAmount * GAME_SESSION_COST) };
    handleUpdateUser(updatedUser);
  };

  const saveToHistory = (finalGameState: GameState) => {
    if (!user) return;
    const team1 = finalGameState.teams[0];
    const team2 = finalGameState.teams[1];
    let winner = 'تعادل';
    if (team1.score > team2.score) winner = team1.name;
    else if (team2.score > team1.score) winner = team2.name;

    const newItem: GameHistoryItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleString('ar-EG'),
      teams: [team1, team2],
      winner: winner,
      userEmail: user.email
    };

    const newUsedIds = Array.from(new Set([...user.usedQuestionIds, ...finalGameState.answeredQuestionIds]));
    handleUpdateUser({ ...user, usedQuestionIds: newUsedIds });
    setHistory(prev => [newItem, ...prev]);
  };

  const renderView = () => {
    if (!user && currentView !== 'LOGIN') {
      return <Login onLogin={handleLogin} />;
    }

    switch (currentView) {
      case 'LOGIN': return <Login onLogin={handleLogin} />;
      case 'HOME': return <Home setView={setView} user={user} adminEmail={ADMIN_EMAIL} />;
      case 'SHOP': return <Shop user={user} onPurchaseBalance={handleBalancePurchase} gameCost={GAME_SESSION_COST} />;
      case 'HISTORY': return <History history={history.filter(h => h.userEmail === user?.email)} />;
      case 'DASHBOARD': 
        if (user?.role !== 'admin') {
          setView('HOME');
          return null;
        }
        return (
          <Dashboard 
            categories={categories} 
            onUpdateCategories={setCategories} 
            allUsers={users}
            onUpdateUser={handleUpdateUser}
            allHistory={history}
          />
        );
      case 'GAME_SETUP':
        return <GameSetup 
          categories={categories} 
          onStartGame={startGame} 
          userBalance={user?.balance || 0}
          gameCost={GAME_SESSION_COST}
        />;
      case 'GAME_PLAY':
        return gameState ? (
          <GamePlay 
            gameState={gameState} 
            setGameState={setGameState} 
            onEndGame={() => {
              saveToHistory(gameState);
              setView('HOME');
            }} 
          />
        ) : <Home setView={setView} user={user} adminEmail={ADMIN_EMAIL} />;
      default: return <Home setView={setView} user={user} adminEmail={ADMIN_EMAIL} />;
    }
  };

  return (
    <Layout user={user} currentView={currentView} setView={setView} onLogout={handleLogout}>
      {renderView()}
    </Layout>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
