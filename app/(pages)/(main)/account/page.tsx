"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/lib/supabaseClient"
import type { User } from "@supabase/supabase-js"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Profile {
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
}

const AccountView = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile>({
    first_name: null,
    last_name: null,
    avatar_url: null,
  })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUserAndProfile = async (): Promise<void> => {
      try {
        // Get authenticated user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError) throw userError

        if (!user) {
          router.push("/auth")
          return
        }

        setUser(user)

        // Fetch profile data from profiles table
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("first_name, last_name, avatar_url")
          .eq("id", user.id)
          .single()

        if (profileError && profileError.code !== "PGRST116") {
          console.error("Error fetching profile: ", profileError)
        }

        if (profileData) {
          setProfile({
            first_name: profileData.first_name,
            last_name: profileData.last_name,
            avatar_url: profileData.avatar_url,
          })
        }
      } catch (error: any) {
        console.error("Error: ", error.message)
        router.push("/auth")
      } finally {
        setLoading(false)
      }
    }

    fetchUserAndProfile()
  }, [router])

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push("/auth")
    } catch (error: any) {
      console.error("Error signing out: ", error.message)
    }
  }

  const getInitials = () => {
    if (profile.first_name && profile.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
    } else if (user?.email) {
      return user.email.substring(0, 2).toUpperCase()
    }
    return "U"
  }

  if (loading) {
    return (
      <main className="h-screen w-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-pulse text-lg font-medium">Loading...</div>
      </main>
    )
  }

  return (
    <>
    
    </>
      
  )
}

export default AccountView;




