"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

// Mock user type
interface MockUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

interface AuthContextType {
  currentUser: MockUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, displayName: string) => Promise<void>
  logout: () => Promise<void>
  isAuthModalOpen: boolean
  setIsAuthModalOpen: (isOpen: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Mock user storage
const MOCK_USERS_KEY = "cineverse-mock-users"
const CURRENT_USER_KEY = "cineverse-current-user"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  // Load current user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY)
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        // Ensure displayName is not null
        if (parsedUser && !parsedUser.displayName) {
          parsedUser.displayName = "Anonymous User"
        }
        setCurrentUser(parsedUser)
      } catch (error) {
        console.error("Error loading saved user:", error)
        localStorage.removeItem(CURRENT_USER_KEY)
      }
    }
    setLoading(false)
  }, [])

  // Save current user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser))
    } else {
      localStorage.removeItem(CURRENT_USER_KEY)
    }
  }, [currentUser])

  async function signup(email: string, password: string, displayName: string) {
    try {
      setLoading(true)

      // Validate inputs
      if (!email || !password || !displayName) {
        throw new Error("All fields are required")
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters")
      }

      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || "[]")

      // Check if user already exists
      const userExists = existingUsers.find((user: any) => user.email === email)
      if (userExists) {
        throw new Error("User already exists with this email")
      }

      // Create new user
      const newUser: MockUser = {
        uid: `user-${Date.now()}`,
        email: email.trim(),
        displayName: displayName.trim() || "Anonymous User",
        photoURL: null,
      }

      // Save user to mock database
      const updatedUsers = [...existingUsers, { ...newUser, password }]
      localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(updatedUsers))

      // Set as current user
      setCurrentUser(newUser)
      setIsAuthModalOpen(false)

      // Show success message
      alert("Account created successfully! 🎉")
    } catch (error: any) {
      console.error("Error signing up:", error)
      throw new Error(error.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  async function login(email: string, password: string) {
    try {
      setLoading(true)

      // Validate inputs
      if (!email || !password) {
        throw new Error("Email and password are required")
      }

      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || "[]")

      // Find user
      const user = existingUsers.find((u: any) => u.email === email && u.password === password)
      if (!user) {
        throw new Error("Invalid email or password")
      }

      // Set as current user (remove password from user object)
      const { password: _, ...userWithoutPassword } = user

      // Ensure displayName is not null
      if (!userWithoutPassword.displayName) {
        userWithoutPassword.displayName = "Anonymous User"
      }

      setCurrentUser(userWithoutPassword)
      setIsAuthModalOpen(false)

      // Show success message
      alert("Logged in successfully! 🎉")
    } catch (error: any) {
      console.error("Error logging in:", error)
      throw new Error(error.message || "Failed to log in")
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    try {
      setCurrentUser(null)
      alert("Logged out successfully!")
    } catch (error: any) {
      console.error("Error logging out:", error)
      throw new Error(error.message || "Failed to log out")
    }
  }

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    isAuthModalOpen,
    setIsAuthModalOpen,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
