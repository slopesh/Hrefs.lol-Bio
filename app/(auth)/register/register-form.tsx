'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import Link from 'next/link'

export default function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTos, setAgreeToTos] = useState(false)

  const validateInviteCode = (code: string) => {
    // Basic format validation: alphanumeric, 6-12 characters
    const inviteCodeRegex = /^[a-zA-Z0-9]{6,12}$/
    return inviteCodeRegex.test(code)
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const username = formData.get('username') as string
    const inviteCode = formData.get('inviteCode') as string

    // Validate TOS agreement
    if (!agreeToTos) {
      setError('Please agree to the terms of service.')
      setLoading(false)
      return
    }

    // Validate invite code format
    if (!validateInviteCode(inviteCode)) {
      setError('Invalid invite code format')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          username,
          inviteCode,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Something went wrong')
      }

      // Sign in the user after successful registration
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      router.push('/dashboard')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 text-gray-300">
      {error && (
        <div className="rounded-md bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-200">
          Username
        </label>
        <div className="mt-1">
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-200">
          Password
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            className="input pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300 focus:outline-none focus:text-primary-400"
          >
            {showPassword ? (
              <FiEyeOff className="h-5 w-5" />
            ) : (
              <FiEye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-200">
          Invite Code
        </label>
        <div className="mt-1">
          <input
            id="inviteCode"
            name="inviteCode"
            type="text"
            required
            className="input"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="agreeToTos"
          name="agreeToTos"
          type="checkbox"
          checked={agreeToTos}
          onChange={(e) => setAgreeToTos(e.target.checked)}
          required
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-600 rounded bg-[#181818]"
        />
        <label htmlFor="agreeToTos" className="ml-2 block text-sm text-gray-400">
          I have read and agree to the <Link href="/terms" className="text-primary-400 hover:text-white transition-colors duration-200">Terms of Service</Link>
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </div>
    </form>
  )
} 