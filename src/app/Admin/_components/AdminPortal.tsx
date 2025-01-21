"use client";
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { Trash2, House } from 'lucide-react';
import { app } from '../../../../firebaseConfig/firebase';
import './AdminPortal.css';

interface WaitlistEntry {
  id: string;
  name?: string;
  email?: string;
  organization?: string;
  role?: string;
  source?: string;
  timestamp?: number;
}

const AdminPortal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [waitlistData, setWaitlistData] = useState<WaitlistEntry[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
      if (user) {
        fetchWaitlistData();
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchWaitlistData = () => {
    const db = getDatabase(app);
    const waitlistRef = ref(db, 'Waitlist');

    onValue(waitlistRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const waitlistArray = Object.entries(data).map(([entryId, values]) => {
          if (typeof values === 'object' && values !== null) {
            const entry = values as Omit<WaitlistEntry, 'id'>;
            return {
              ...entry,
              id: entryId
            };
          } else {
            return { id: entryId } as WaitlistEntry;
          }
        });
        setWaitlistData(waitlistArray);
      } else {
        setWaitlistData([]);
      }
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError('Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      setWaitlistData([]);
    } catch {
      setError('Error logging out');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const db = getDatabase(app);
      await remove(ref(db, `Waitlist/${id}`));
    } catch {
      setError('Error deleting entry');
    }
  };

  const copyEmailsToClipboard = () => {
    const emails = waitlistData.map(entry => entry.email).join(', ');
    navigator.clipboard.writeText(emails).then(() => {
      alert('Emails copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy emails: ', err);
    });
  };

  if (!user) {
    return (
      <div className="login-container">
        <div className="homeButton">
          <a href="/"><House style={{ color: 'black' }}/></a>
        </div>

        <div className="login-card">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="header">
        <h1>Waitlist Management</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="table-container">
        <table className="waitlist-table">
          <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Organization</th>
            <th>Role</th>
            <th>Source</th>
            <th>Timestamp</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {waitlistData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>{entry.organization}</td>
              <td>{entry.role}</td>
              <td>{entry.source}</td>
              <td>{entry.timestamp ? new Date(entry.timestamp).toLocaleDateString() : ''}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(entry.id)}
                >
                  <Trash2 size={16}/>
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <br/>

      <div className="header">
        <h1>Email List</h1>
      </div>
      {waitlistData.map((entry) => (
        <div key={entry.id}>
          {entry.email}
        </div>
      ))}
      <button onClick={copyEmailsToClipboard} className="copy-button">
        Copy to Clipboard
      </button>
    </div>
  );
};

export default AdminPortal;