import classroomsService from '@/services/classrooms.service'
import { useQuery } from '@tanstack/react-query'
import { DashboardNavbarProfile } from './dashboard-navbar-profile'
import { ProfileWrapper } from './profile-wrapper'
import { Dialog } from './ui/dialog'

interface IProfileWrapper {
	id: string
	name: string
	group: string | null
	preferredLang: 'r' | 't'
	avatarId: 0 | 1 | 2 | 3
	isMobile?: boolean
}

export const ProfileDialog = ({
	id,
	name,
	group,
	preferredLang,
	avatarId,
	isMobile,
}: IProfileWrapper) => {
	const { data } = useQuery({
		queryKey: ['classrooms', id],
		queryFn: () => classroomsService.getByUser(id),
	})
	return (
		<Dialog
			block={
				<DashboardNavbarProfile
					id={id}
					isMobile={isMobile}
					name={name}
					group={data?.data.join(',') || 'Отсутствует'}
				/>
			}
		>
			<ProfileWrapper />
		</Dialog>
	)
}
