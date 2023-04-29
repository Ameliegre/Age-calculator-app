import styled from 'styled-components'
import CountUp from 'react-countup';

const AgeCalculatorWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    @media (max-width: 375px) {
        padding-left: 14px;
       }
`

function AgeCalculator ({showAgeCalculator, day, month, year}) {

    let ageInYears;
    let ageInMonths;
    let ageInDays; 

    if (day && month && year && showAgeCalculator) {
        
        const today = new Date()
        const birthDate = new Date(year, month -1 , day); 
        const diffTime = Math.abs(today - birthDate);
        ageInYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25))
        ageInMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * (365.25 / 12)));
        ageInDays = Math.floor((diffTime % (1000 * 60 * 60 * 24 * (365.25 / 12))) / (1000 * 60 * 60 * 24));       
    }

    console.log(showAgeCalculator)
    return (
        <div>
            <AgeCalculatorWrapper>
                {showAgeCalculator && <CountUp start={0} end={ageInYears} duration={1} delay={0}>
                    {({ countUpRef }) => (
                        <h1>
                            <span ref={countUpRef} />
                        </h1>
                    )}
                </CountUp>}
                {!showAgeCalculator && <h1>- -</h1>}
                <h2>years</h2>
            </AgeCalculatorWrapper>
            <AgeCalculatorWrapper>
                {showAgeCalculator && <CountUp start={0} end={ageInMonths} duration={1} delay={0.2}>
                    {({ countUpRef }) => (
                        <h1>
                            <span ref={countUpRef} />
                        </h1>
                    )}
                </CountUp>}
                {!showAgeCalculator && <h1>- -</h1>}
                <h2>months</h2>
            </AgeCalculatorWrapper><AgeCalculatorWrapper>
                {showAgeCalculator && <CountUp start={0} end={ageInDays} duration={1} delay={0}>
                    {({ countUpRef }) => (
                        <h1>
                            <span ref={countUpRef} />
                        </h1>
                    )}
                </CountUp>}
                {!showAgeCalculator && <h1>- -</h1>}
                <h2>days</h2>
            </AgeCalculatorWrapper>
        </div>
    )

}

export default AgeCalculator;