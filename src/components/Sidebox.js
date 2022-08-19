import React from 'react'

const Sidebox=React.memo(({wendaFound, waldoFound, wizardFound, odlawFound, status, odlaw, wenda, waldo, wizard, openBox, closeBox, setWaldoFound})=>{
  return (
    <div className='side-box flex transition' style={{left: '0px'}}>
        <div className='character-box flex column transition'>
          <div style={{fontFamily: 'open sans',fontSize: '1.5em',marginBottom: '20px'}}>Characters To Find:</div>
          <div className='character-card flex'>
            <img className='character-image' src={waldo}/>
            <div className='character-text flex column'>Waldo <div className={waldoFound ? 'found-text green':'found-text red'}>{waldoFound ? 'Found': 'Not Found'}</div></div>
          </div>
          <div className='character-card flex'>
            <img className='character-image' src={wenda}/>
            <div className='character-text flex column'>Wenda <div className={wendaFound ? 'found-text green':'found-text red'}>{wendaFound ? 'Found': 'Not Found'}</div><button onClick={()=>{setWaldoFound(false)}}>oduf</button></div>
          </div>
          <div className='character-card flex'>
            <img className='character-image' src={wizard}/>
            <div className='character-text flex column'>Wizard <div className={wizardFound ? 'found-text green':'found-text red'}>{wizardFound ? 'Found': 'Not Found'}</div></div>
          </div>
          <div className='character-card flex'>
            <img className='character-image' src={odlaw}/>
            <div className='character-text flex column'>Odlaw <div className={odlawFound ? 'found-text green':'found-text red'}>{odlawFound ? 'Found': 'Not Found'}</div></div>
          </div>
        </div>
        <div className='character-card-opener flex pointer' onClick={()=>{status ? openBox() : closeBox()}}>◀</div>
      </div>
  )
})

export default Sidebox