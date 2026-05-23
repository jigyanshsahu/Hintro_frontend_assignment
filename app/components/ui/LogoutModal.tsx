import { Button } from './Button'

interface LogoutModalProps {
  onClose: () => void
  onConfirm: () => void
}

export function LogoutModal({ onClose, onConfirm }: LogoutModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="w-full max-w-[460px] rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="border-b border-slate-100 pb-3 mb-5">
          <h3 className="text-xl font-bold text-slate-900 text-left">
            Leaving already?
          </h3>
        </div>
        <p className="text-sm text-slate-500 text-left mb-8">
          You can log back in anytime to continue your meetings with Hintro.
        </p>
        
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            className="rounded-lg font-semibold px-5 py-2"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-black hover:bg-slate-900 text-white rounded-lg font-semibold px-5 py-2 border border-black"
            onClick={onConfirm}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  )
}
