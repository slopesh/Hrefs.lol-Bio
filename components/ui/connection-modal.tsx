import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2, X } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  social: {
    name: string;
    icon: LucideIcon;
    color: string;
    bg: string;
  };
  onAdd: (data: { mode: 'link' | 'text'; value: string }) => Promise<void>;
  isLoading: boolean;
}

export function ConnectionModal({ isOpen, onClose, social, onAdd, isLoading }: ConnectionModalProps) {
  const [value, setValue] = useState('');
  const [mode, setMode] = useState<'link' | 'text'>('link');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd({ mode, value });
    setValue('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#181818] border-[#232323] rounded-2xl p-6 max-w-md mx-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${social.bg}`}>
                <social.icon className={`w-5 h-5 ${social.color}`} />
              </div>
              <DialogTitle className="text-2xl font-bold text-white">
                Add {social.name}
              </DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <DialogDescription className="text-gray-400">
            Add your {social.name} profile to your bio
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="value" className="text-white/80">
              {mode === 'link' ? 'Profile URL' : 'Username'}
            </Label>
            <Input
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={mode === 'link' ? 'Enter your profile URL' : 'Enter your username'}
              required
              className={cn(
                "bg-[#232323] border-[#232323] text-white",
                "placeholder:text-white/50 focus:border-white/20",
                "transition-all duration-300"
              )}
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant={mode === 'link' ? 'default' : 'outline'}
              onClick={() => setMode('link')}
              className={cn(
                "flex-1",
                mode === 'link' ? "bg-white text-black hover:bg-white/90" : "border-[#232323]"
              )}
            >
              URL
            </Button>
            <Button
              type="button"
              variant={mode === 'text' ? 'default' : 'outline'}
              onClick={() => setMode('text')}
              className={cn(
                "flex-1",
                mode === 'text' ? "bg-white text-black hover:bg-white/90" : "border-[#232323]"
              )}
            >
              Username
            </Button>
          </div>

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
                Adding...
              </div>
            ) : (
              'Add Connection'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}