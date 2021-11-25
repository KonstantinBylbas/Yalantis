import './App.scss';
import { useState, useEffect, useContext, useCallback } from 'react';
import { EmployeesContext } from './Contexts/employeesContext';
import Employee from './Components/employee/employee';

export default function App() {

    useEffect(() => {
        fetch('https://yalantis-react-school-api.yalantis.com/api/task0/users')
            .then((data) => {
                if (data.ok) return data.json();
                throw ('Error download');
            })
            .then((data) => {
                setContextEmployees(data);
            })
            .catch((error) => console.log(error))
            ;
    }, [])

    const { contextEmployees, setContextEmployees } = useContext(EmployeesContext);

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    const currentMonth = new Date().getMonth();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'];
    const monthsFromCurrent = [months[currentMonth], ...months.slice(currentMonth + 1), ...months.slice(0, currentMonth)];

    const [birthdays, setBirthdays] = useState([]);
    useEffect(() => {
        if (sessionStorage.getItem("birthdays"))
            setBirthdays(JSON.parse(sessionStorage.getItem("birthdays")));
    }, [])

    useEffect(() => {
        window.sessionStorage.setItem("birthdays", JSON.stringify(birthdays));
    }, [birthdays])

    const showBirthday = useCallback((employee) => {
        setBirthdays([...birthdays, employee]);
    }, [birthdays]);

    const hideBirthday = useCallback((employee) => {
        setBirthdays(birthdays.splice(birthdays.indexOf(employee), 1))
        setBirthdays([...birthdays]);
    }, [birthdays]);

    return (
        <div className="App">
            <div className='content row'>
                <div className='employees'>
                    <h4>
                        Employees
                    </h4>
                    <div className='row'>
                        {
                            alphabet.map(letter => {
                                let isEmpty = true;
                                let iterration = 1;
                                return <div className='column'>
                                    <h5>
                                        {letter}
                                    </h5>

                                    {
                                        contextEmployees && contextEmployees.length ?
                                            contextEmployees.map(employee => (
                                                iterration++ ,
                                                letter === employee.firstName.slice(0, 1).toLowerCase() ?
                                                    (isEmpty = false, <Employee employee={employee} 
                                                            radioActive={birthdays && birthdays.length 
                                                                ? birthdays.find(birthday => birthday.id === employee.id) 
                                                                : false} 
                                                                hideBirthday={hideBirthday} showBirthday={showBirthday} 
                                                                />)
                                                    : isEmpty && iterration === contextEmployees.length ?
                                                        <p>No Employees</p>
                                                        : ''
                                            ))
                                            : <p>Error download</p>
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className='birthday'>
                    <h4>
                        Employees birthday
                    </h4>
                    {
                        birthdays && birthdays.length ?
                            monthsFromCurrent.map(month => {
                                let isEmpty = true;
                                let iterration = 0;
                                return <div className='month'>
                                    <h6>
                                        {month}
                                    </h6>

                                    {
                                        birthdays.sort(function (a, b) {
                                            if (a.lastName < b.lastName) {
                                                return -1;
                                            }
                                            return 0;
                                        })
                                            .map(employee => (
                                                iterration++ ,
                                                month === months[employee.dob.slice(5, 7) - 1] ? (
                                                    isEmpty = false,
                                                    <li>{employee.firstName} {employee.lastName} - {employee.dob.slice(8, 10)} {months[employee.dob.slice(5, 7) - 1]}, {employee.dob.slice(0, 4)} year</li>
                                                )
                                                    : isEmpty && iterration === birthdays.length ?
                                                        <p>No Employees</p>
                                                        : ''
                                            ))
                                    }
                                </div>
                            }) : 'Employees List is empty'
                    }
                </div>
            </div>
        </div>
    );
}