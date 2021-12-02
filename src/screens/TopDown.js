import React from 'react'

const style = {
    backgroundcolor:
}

const TopDown = () => {
    // let washerVolts
    // let washerWatts
    // let dryerVolts
    // let dryerWatts
    // let tvVolts
    // let tvWatts
    // let refrigeratorVolts
    // let refrigeratorWatts
    // let kitchenVolts
    // let kitchenWatts
    let volts
    let watts
    let color

    if (volts < 25 && watts <100) {
        color = '#6aa84f'
    }else if ((volts > 25 && volts < 35) && (watts > 100 && watts < 250)){
        color = '#ef962e'
    }else{
        color = '#cc4125'
    }

    return (
        <div>
            
        </div>
    )
}

export default TopDown
