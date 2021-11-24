import './employee.scss';
import { useState } from 'react';

export default function Employee({ showBirthday, hideBirthday, radioActive, employee: { id, firstName, lastName } }) {

    const [active, setActive] = useState(radioActive);    

    return (
        <div className="employee">
            <h6 className={`${active ? 'blue' : ''}`}>
                {firstName} {lastName}
            </h6>
            <label>
                <input type="radio" defaultChecked={radioActive ? false : true} name={`${id}radio`} onClick={() => {setActive(false); hideBirthday()}} />
                Not active
            </label>
            <label>
                <input type="radio" defaultChecked={radioActive ? true : false} name={`${id}radio`} onClick={() => {setActive(true); showBirthday()}} />
                Active
            </label>
        </div>
    )
}