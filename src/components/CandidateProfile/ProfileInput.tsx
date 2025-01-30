'use client';

import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../../../firebaseConfig/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';

interface ProfileInputProps {
  onSubmit: (linkedInUrl: string) => Promise<void>;
}

const ProfileInput = ({ onSubmit }: ProfileInputProps) => {
  const [user, loading] = useAuthState(auth);
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCandidateData = async () => {
      if (!user?.uid) return;

      try {
        setIsLoading(true);
        const candidateRef = doc(firestore, 'Candidates', user.uid);
        const candidateDoc = await getDoc(candidateRef);

        if (candidateDoc.exists()) {
          const data = candidateDoc.data();
          if (data.linkedInUrl) {
            setLinkedInUrl(data.linkedInUrl);
          }
        }
      } catch (err) {
        console.error('Error fetching candidate data:', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to fetch profile data'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidateData();
  }, [user]);

  const validateLinkedInUrl = (url: string): boolean => {
    const linkedInRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
    return linkedInRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Required',
        text: 'You must be logged in to update your profile'
      });
      return;
    }

    if (!linkedInUrl.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing URL',
        text: 'Please enter a LinkedIn URL'
      });
      return;
    }

    if (!validateLinkedInUrl(linkedInUrl)) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid URL',
        text: 'Please enter a valid LinkedIn profile URL'
      });
      return;
    }

    setIsLoading(true);

    try {
      // Update Firestore
      const candidateRef = doc(firestore, 'Candidates', user.uid);
      await setDoc(candidateRef, {
        linkedInUrl,
        updatedAt: new Date(),
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }, { merge: true });

      await onSubmit(linkedInUrl);
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Profile updated successfully'
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err instanceof Error ? err.message : 'An error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          Please sign in to update your profile.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="linkedInUrl" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            LinkedIn Profile URL
          </label>
          <input
            id="linkedInUrl"
            type="url"
            value={linkedInUrl}
            onChange={(e) => setLinkedInUrl(e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isLoading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfileInput;