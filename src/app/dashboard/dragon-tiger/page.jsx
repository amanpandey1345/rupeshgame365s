// import Nav from '@/components/Nav'
import React from 'react'
import '@/designs/dragon-tiger.css'
import Results from '@/components/Results'
import Image from 'next/image'
import dragon from '@/images/dragon.png'
import tiger from '@/images/tiger.png'
import tie from '@/images/tie.png'
import Music from '@/components/Music'


const DragonTiger = () => {
  return (
    <>
      {/* <Nav /> */}
      <Results />
      <Music />
      <section id='dragon-tiger'>
        <div id='dragon'>
          <h5>₹ 5000.00</h5>
          <Image src={dragon} width={100} height={100} alt='dragon-img' />
          <h4>Dragon</h4>
        </div>

        <div id='tie'>
          <h5>₹ 3000.00</h5>
          <Image src={tie} width={100} height={100} alt='tie-img' />
          <h4>Tie</h4>
        </div>

        <div id='tiger'>
          <h5>₹ 5000.00 </h5>
          <Image src={tiger} width={100} height={100} alt='tiger-img' />
          <h4>Tiger</h4>
        </div>
      </section>

      <section id='bet-coin'>
          <span>10</span>
          <span>20</span>
          <span>50</span>
          <span>100</span>
          <span>200</span>
          <span>500</span>
          <span>1000</span>
          <span>2000</span>
      </section>
    </>
  )
}

export default DragonTiger