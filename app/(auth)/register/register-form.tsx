'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTos, setAgreeToTos] = useState(false)
  const [formState, setFormState] = useState({
    email: '',
    username: '',
    password: '',
    inviteCode: ''
  })

  const validateInviteCode = (code: string) => {
    // Basic format validation: alphanumeric, 6-12 characters
    const inviteCodeRegex = /^[a-zA-Z0-9]{6,12}$/
    return inviteCodeRegex.test(code)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    const { email, password, username, inviteCode } = formState

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
    <motion.form 
      onSubmit={onSubmit} 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/20">
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white/80">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formState.email}
          onChange={handleInputChange}
          className={cn(
            "bg-[#232323] border-[#232323] text-white",
            "placeholder:text-white/50 focus:border-white/20",
            "transition-all duration-300"
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="username" className="text-white/80">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          value={formState.username}
          onChange={handleInputChange}
          className={cn(
            "bg-[#232323] border-[#232323] text-white",
            "placeholder:text-white/50 focus:border-white/20",
            "transition-all duration-300"
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-white/80">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={formState.password}
            onChange={handleInputChange}
            className={cn(
              "bg-[#232323] border-[#232323] text-white",
              "placeholder:text-white/50 focus:border-white/20",
              "transition-all duration-300 pr-10"
            )}
          />
          <motion.button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300 focus:outline-none"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {showPassword ? (
              <FiEyeOff className="h-5 w-5" />
            ) : (
              <FiEye className="h-5 w-5" />
            )}
          </motion.button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="inviteCode" className="text-white/80">Invite Code</Label>
        <Input
          id="inviteCode"
          name="inviteCode"
          type="text"
          required
          value={formState.inviteCode}
          onChange={handleInputChange}
          className={cn(
            "bg-[#232323] border-[#232323] text-white",
            "placeholder:text-white/50 focus:border-white/20",
            "transition-all duration-300"
          )}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="agreeToTos"
          checked={agreeToTos}
          onCheckedChange={(checked) => setAgreeToTos(checked as boolean)}
          className="border-[#232323] data-[state=checked]:bg-white data-[state=checked]:text-black"
        />
        <Label htmlFor="agreeToTos" className="text-sm text-gray-400">
          I have read and agree to the{' '}
          <Link href="/terms" className="text-white hover:text-white/80 transition-colors duration-200">
            Terms of Service
          </Link>
        </Label>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className={cn(
          "w-full bg-white text-black hover:bg-white/90",
          "transition-all duration-300",
          loading && "opacity-50 cursor-not-allowed"
        )}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating account...
          </div>
        ) : (
          'Create account'
        )}
      </Button>
    </motion.form>
  )
} 