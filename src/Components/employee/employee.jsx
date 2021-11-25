import './employee.scss';
import { useState } from 'react';

export default function Employee({ showBirthday, hideBirthday, radioActive, employee  }) {

    const [active, setActive] = useState(radioActive);    
    const { id, firstName, lastName } = employee; 
    return (
        <div className="employee">
            <h6 className={`${active ? 'blue' : ''}`}>
                {firstName} {lastName}
            </h6>
            <label>
                <input type="radio" defaultChecked={radioActive ? false : true} name={`${id}radio`} onClick={() => {setActive(false); hideBirthday(employee)}} />
                Not active
            </label>
            <label>
                <input type="radio" defaultChecked={radioActive ? true : false} name={`${id}radio`} onClick={() => {setActive(true); showBirthday(employee)}} />
                Active
            </label>
        </div>
    )
}