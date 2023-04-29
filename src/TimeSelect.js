import styled from 'styled-components'
import arrow from './assets/images/icon-arrow.svg'
import { useEffect, useState } from 'react'
import AgeCalculator from './AgeCalculator'

const FormStyle = styled.form`
  height: 134px;
  @media (max-width: 375px) {
    height: 200px;
   }
`

const InputWrapper = styled.div `
  display: flex;
  flex-direction: row;
  @media (max-width: 375px) {
   padding: 3%;
   padding-top: 7%;
  }
`

const Separation = styled.hr`
  margin-top: 30px;
  border-top: hsl(0, 0%, 86%);
`

const ButtonStyle = styled.button `
  border: none;
  background-color: hsl(259, 100%, 65%);
  padding: 14px;
  border-radius: 32px;
  position: relative;
  left: 90%;
  top:-38px;
  &:hover {
    background-color: hsl(0, 0%, 8%);
    cursor: pointer;
  }
  @media (max-width: 375px) {
    transition: left 0.3s ease-out;
    left: 40%
  }
`

const ImageStyle = styled.img`
  height: 32px;
`

const Title = styled.p `
    &.error {
      color: hsl(0, 100%, 67%);
    }
  `

  const Text = styled.p `
    color: hsl(0, 100%, 67%);
    font-weight: 400;
    font-style: italic;
  `

  const Input = styled.input`
    &.error {
      border-color: hsl(0, 100%, 67%);
    }
  `
  const Message = styled.div`
  height:20px;
  margin-top: 5px;
`

  const REGEX = /^[0-9]{1,2}$/
  const YEAR_REGEX = /^[0-9]{1,4}$/

function TimeSelect() {

  const [day, setDay] = useState('')
  const [dayError, setDayError] = useState(null)
  
  const [month, setMonth] = useState('')
  const [monthError, setMonthError ] = useState(null)

  const [year, setYear] = useState('')
  const [yearError, setYearError] = useState(null)

  const [Error, setError] = useState(null)
  const [dateError, setDateError] = useState(null)
  const [showAgeCalculator, setShowAgeCalculator] = useState(false);

  useEffect(() => {
    // Verifie si l'input correspond à un format de date 
    const dayResult = REGEX.test(day)
    const monthResult = REGEX.test(month)
    const yearResult = YEAR_REGEX.test(year)

    //Verifie que la valeur inscrite correspond au nb de jour d'un mois
    setDayError(null);
    if (day !== '') {
      const isDayValid = dayResult && Number(day) >= 1 && Number(day) <= 31;
      if (!isDayValid) {
        setDayError('Must be a valid day');
      }
    }

    //Verifie que la valeur inscrite correspond au nb de mois dans une année
    setMonthError(null);
    if (month !== '') {
      const isMonthValid = monthResult && Number(month) >= 1 && Number(month) <=12;
      if (!isMonthValid) {
        setMonthError('Must be a valid month');
      }
    }

    //Verifie que la valeur inscrite n'est pas supérieur à l'année en cours
    setYearError(null);
    if (year !== '') {
      const isYearValid = yearResult && Number(year) <= new Date().getFullYear();
      if(!isYearValid) {
        setYearError('Must be in the past')
      }
    }
  
  },[day, month, year])

  const handleSubmit = (e) => {
    e.preventDefault()
    //Renvoi le nombre de jour max possible pour un mois d'une année donnée
    const getDaysInMonth = new Date(year, month, 0).getDate()

    setError(null)
    setDateError(null)
    setShowAgeCalculator(false)

    if (dayError || monthError || yearError ) {
      setShowAgeCalculator(false)
    } else if (day === '' || month === '' || year === '') {
      //Verifie qu'il y a bien des valeurs dans les inputs sinon retourne une erreur
      setError('This field is required') 
      setShowAgeCalculator(false)
    } else if (day > getDaysInMonth) {
      //Verifie que le nombre de jour selectionné correspond au nombre de jour de chaque mois
      setDateError('Must be a valid date')
      setShowAgeCalculator(false)
    } else if (new Date(year, month - 1, day).getTime() > new Date().getTime()) {
      //Verifie que la date selectionnée ne soit pas supérieur à la date actuel
      setDateError('Must be in the past')
      setShowAgeCalculator(false)
    } else {
      setShowAgeCalculator(true)
    }
  }

  return (
    <>
      <FormStyle onSubmit={handleSubmit}>
        <InputWrapper>
        <>
            <div>
              <Title className={dayError || (Error && day === '') || dateError ? 'error' : ''} >D A Y</Title>
              <Input value={day} className={dayError || (Error && day === '') || dateError ? 'error' : ''} placeholder='DD' onChange={(e) => {
                setDay(e.target.value)
                setShowAgeCalculator(false)
              }}/>
              <Message>
                {dayError && (<Text>{dayError}</Text>)}
                {(!dayError && Error && day === '') && (<Text>{Error}</Text>)}
                {dateError && (<Text>{dateError}</Text>)}
              </Message>
            </div>
        </>
        <>
            <div>
                <Title className={monthError || (Error && month === '') || dateError ? 'error' : ''}>M O N T H</Title>
                <Input value={month}  className={monthError || (Error && month === '') || dateError ? 'error' : ''} placeholder='MM' onChange={(e) => {
                  setMonth(e.target.value)
                  setShowAgeCalculator(false)
                }}/>
                <Message>
                  {monthError && (<Text>{monthError}</Text>)}
                  {(!monthError && Error && month === '') && (<Text>{Error}</Text>)}
                </Message>
            </div> 
        </>
        <>
            <div>
                <Title className={yearError || (Error && year === '' ) || dateError ? 'error' : ''}>Y E A R</Title>
                <Input value={year} className={yearError || (Error && year === '' ) || dateError ? 'error' : ''} placeholder='YYYY' onChange={(e) => {
                  setYear(e.target.value)
                  setShowAgeCalculator(false)
                }}/>
                <Message>
                  {yearError && (<Text>{yearError}</Text>)}
                  {(!yearError && Error && year === '') && (<Text>{Error}</Text>)}
                </Message>
            </div> 
        </>
        </InputWrapper>
        <Separation/>
        <ButtonStyle type='submit'>
          <ImageStyle src={arrow} alt='fleche'/>
        </ButtonStyle>
      </FormStyle>
      <AgeCalculator showAgeCalculator={showAgeCalculator} day={day} month={month} year={year}/>
    </>
  );
}

export default TimeSelect;