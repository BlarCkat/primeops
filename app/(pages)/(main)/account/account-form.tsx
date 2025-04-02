'use client'

import { useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'

interface Profile {
  first_name: string
  last_name: string
}

interface AccountFormProps {
  user: User
  profile: Profile
}

export default function AccountForm({ user, profile }: AccountFormProps) {
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState(profile.first_name)
  const [lastName, setLastName] = useState(profile.last_name)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault()
    
    try {
      setLoading(true)
      setMessage(null)
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          first_name: firstName,
          last_name: lastName,
          updated_at: new Date().toISOString(),
        })
      
      if (error) throw error
      
      setMessage({ type: 'success', text: 'Your profile has been updated.' })
    } catch (error) {
      console.error(error)
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  async function handleSignOut() {
    try {
      setLoading(true)
      await supabase.auth.signOut()
      window.location.href = '/login'
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Profile Information</h2>
      </div>
      
      <form onSubmit={updateProfile} className="p-6">
        {message && (
          <div className={`mb-4 p-3 rounded ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' 
              : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
          }`}>
            {message.text}
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input 
            id="email" 
            type="email" 
            value={user.email} 
            disabled 
            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 cursor-not-allowed"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Your email address cannot be changed
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName || ''}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName || ''}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>
        
        <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            type="button"
            onClick={handleSignOut}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Log Out
          </button>
          <button 
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
