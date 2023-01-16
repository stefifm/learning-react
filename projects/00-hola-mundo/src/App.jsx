import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

const users = [
  {
    userName: "stefifm",
    name: "Stefania Bruera",
    isFollowing: true
  },
  {
    userName: "midudev",
    name: "Miguel Angel Duram",
    isFollowing: false
  },
  {
    userName: "kikobeats",
    name: "Kiko",
    isFollowing: true
  },
  {
    userName: "elonmusk",
    name: "Elon Musk",
    isFollowing: false
  },
]
export function App() {
  return (
    <section className='App'>
      {
        users.map(({userName, name, isFollowing}) => (
          
          <TwitterFollowCard
          userName={userName}
          initialIsFollowing={isFollowing}
          key={userName}          
          >
            {name}
          </TwitterFollowCard>
        ))
      }
    </section>
  )
}
