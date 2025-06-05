import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (data: { username: string; password: string }) => void;
}

export function ConnectionModal({ isOpen, onClose, onConnect }: ConnectionModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await onConnect({ username, password });
      onClose();
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#181818] border-[#232323] rounded-2xl p-6 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white text-center">
            Connect to href.lol
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-center">
            Enter your credentials to connect
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-white/80">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className={cn(
                "bg-[#232323] border-[#232323] text-white",
                "placeholder:text-white/50 focus:border-white/20",
                "transition-all duration-300"
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/80">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className={cn(
                "bg-[#232323] border-[#232323] text-white",
                "placeholder:text-white/50 focus:border-white/20",
                "transition-all duration-300"
              )}
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <Button
            type="submit"
            className={cn(
              "w-full bg-white text-black hover:bg-white/90",
              "transition-all duration-300",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Connecting...
              </div>
            ) : (
              'Connect'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}