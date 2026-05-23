



import { User, Mail, Shield, Calendar, LogIn, Pencil } from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { Badge } from '../ui/Badge'
import { Skeleton } from '../ui/Skeleton'
import { ErrorState } from '../shared/ErrorState'
import { formatDate } from '../../utils/format'
import { cn } from '../../lib/utils'

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string
  value?: string
  icon?: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3 py-4 border-b border-slate-100 last:border-0">
      {icon && (
        <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-slate-800 break-all">{value ?? '—'}</p>
      </div>
    </div>
  )
}

export function SettingsPage() {
  const { data: profile, isLoading, error, refetch } = useProfile()

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />
  }

  return (
    <div className="space-y-6">
      
      <div>
        <h2 className="text-xl font-bold text-slate-900">Settings</h2>
        <p className="mt-0.5 text-sm text-slate-500">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm text-center">
            {isLoading ? (
              <>
                <Skeleton className="mx-auto h-20 w-20 rounded-full" />
                <Skeleton className="mx-auto mt-3 h-5 w-32" />
                <Skeleton className="mx-auto mt-1.5 h-4 w-40" />
              </>
            ) : (
              <>
                <div
                  className={cn(
                    'mx-auto flex h-20 w-20 items-center justify-center rounded-full',
                    'bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-3xl font-bold',
                    'shadow-lg ring-4 ring-white',
                  )}
                >
                  {(profile?.firstName?.[0] ?? '') + (profile?.lastName?.[0] ?? '')}
                </div>
                <h3 className="mt-3 text-base font-semibold text-slate-900">
                  {profile?.firstName} {profile?.lastName}
                </h3>
                <p className="text-sm text-slate-500">{profile?.email}</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <Badge variant={profile?.status === 'active' ? 'success' : 'warning'} dot>
                    {profile?.status ?? 'Unknown'}
                  </Badge>
                  {profile?.is_hintro_admin && (
                    <Badge variant="purple">Admin</Badge>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h3 className="text-sm font-semibold text-slate-800">Profile Information</h3>
              <button
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                aria-label="Edit profile"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
            </div>
            <div className="px-5">
              {isLoading ? (
                <div className="space-y-4 py-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-lg" />
                      <div className="space-y-1.5">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-4 w-36" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <InfoRow
                    label="Full Name"
                    value={`${profile?.firstName ?? ''} ${profile?.lastName ?? ''}`}
                    icon={<User className="h-4 w-4" />}
                  />
                  <InfoRow
                    label="Email Address"
                    value={profile?.email}
                    icon={<Mail className="h-4 w-4" />}
                  />
                  <InfoRow
                    label="Login Method"
                    value={profile?.login_method}
                    icon={<LogIn className="h-4 w-4" />}
                  />
                  <InfoRow
                    label="Member Since"
                    value={formatDate(profile?.createdAt ?? '')}
                    icon={<Calendar className="h-4 w-4" />}
                  />
                  <InfoRow
                    label="User ID"
                    value={profile?.id}
                    icon={<Shield className="h-4 w-4" />}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
