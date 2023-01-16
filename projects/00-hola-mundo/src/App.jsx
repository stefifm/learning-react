import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'
export function App() {
  return (
    <section className='App'>
      <TwitterFollowCard userName='stefifm'>Stefania Bruera</TwitterFollowCard>
      <TwitterFollowCard userName='midudev'>Miguel Angel Duran</TwitterFollowCard>
    </section>
  )
}
