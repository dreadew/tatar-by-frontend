import { UserStore } from '@/types/auth'
import { StateCreator, create } from 'zustand'
import { PersistOptions, persist } from 'zustand/middleware'

interface UserState {
	user: UserStore | null
	update: (value: UserStore | null) => void
	updatePreferredLang: (lang: 'r' | 't') => void
}

type MyPersist = (
	config: StateCreator<UserState>,
	options: PersistOptions<UserState>
) => StateCreator<UserState>

export const useUserStore = create<UserState>(
	(persist as MyPersist)(
		set => ({
			user: null,
			update: (value: UserStore | null) => set({ user: value }),
			updatePreferredLang: (lang: 'r' | 't') =>
				set(state => {
					if (state.user) {
						return { user: { ...state.user, preferredLang: lang } }
					}
					return state
				}),
		}),
		{
			name: 'user-storage',
		}
	)
)
