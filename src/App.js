import { useState } from "react";
import users from "./fake_data";
import ChangeSalary from "./components/ChangeSalary";


const App = () => {
    const [filteredEmployees, setFilteredEmployees] = useState(users);

    const [passwordOne, setPasswordOne] = useState("")
    const [passwordTwo, setPasswordTwo] = useState("")
    const [passwordMatch, setPasswordMatch] = useState("")
    const [passwordComplexity, setPasswordComplexity] = useState('')

    const validatePasswordMatch = () => {
        if (passwordOne !== "" && passwordOne === passwordTwo) setPasswordMatch("Passwords match")
        else setPasswordMatch("Passwords do not match")
        if (passwordTwo === ""){
            setPasswordMatch("")
        } 
    }

    
     const verifyPasswordComplexity = () => {  
        let errorMesage = '';
        setPasswordComplexity('');
        
        if (passwordOne.length < 8) {
          errorMesage = 'Parola trebuie sa contina 8 caractere'
        } ;
        
        let includeCapitalLetter = false
        for ( let i=0; i < passwordOne.length; i++){
            if (passwordOne[i] === passwordOne[i].toUpperCase()) {
                includeCapitalLetter = true;
                break;   
            }
        } 
        if (!includeCapitalLetter) {
            if (errorMesage) {
                errorMesage += ' & sa contina o litera mare';
            } else {
                errorMesage = 'Parola trebuie sa contina o litera mare';
            }
            
        }

        setPasswordComplexity(errorMesage);
    
        if (passwordOne === '') {
            setPasswordComplexity('')
        } 
    }
 

    const handleNameInput = (event) => {
        let currentFilteredEmployees = [];
        let currentSearch = event.target.value;
        
        filteredEmployees.map(user => {
            if(user.name.toLowerCase().includes(currentSearch.toLowerCase())) {
                currentFilteredEmployees.push(user);
                setFilteredEmployees(currentFilteredEmployees);
            }
        });

        if(currentSearch.length < 1) {
            setFilteredEmployees(users);
        }
    }

    function changeSalary(id,symbol){
        const newEmployeesList = [...filteredEmployees];
        if(symbol==="+"){
            newEmployeesList[id].salary +=100;
        }else{
            newEmployeesList[id].salary -=100;
        }
        setFilteredEmployees(newEmployeesList);
    }


    return (
        <>
            <header>
                <div className="container">
                    <h1 className="logo">Are you Hooked?</h1>
                </div>
            </header>

            <section>
                <div className="container">
                    <p className="error">{passwordMatch}</p>
                    <p className="error">{passwordComplexity}</p>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        onChange={(event) => setPasswordOne(event.target.value)}
                        onKeyUp={verifyPasswordComplexity}
                    />
                    <input
                        type="password"
                        placeholder="Verify your password"
                        onChange={ e =>setPasswordTwo(e.target.value)}
                        onKeyUp={validatePasswordMatch}
                    />
                </div>
            </section>

            <section>
                <div className="container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>
                                    <input
                                        onChange={handleNameInput}
                                        type="text"
                                        placeholder="Name..."
                                    />
                                </th>
                                <th>Age</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map(
                                (employee) => (
                                    <tr key={employee.id}>
                                        <th>{employee.id}</th>
                                        <td>{employee.name}</td>
                                        <td>{employee.age}</td>
                                        <td>
                                        <ChangeSalary
                                                            click = {() =>changeSalary(employee.id -1, "-")}>-</ChangeSalary>
                                        <span>{employee.salary}</span>
                                        <ChangeSalary
                                                            click = {() =>changeSalary(employee.id -1, "+")}>+</ChangeSalary>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <footer>
                <div className="container">
                    <p>
                        API provided by{" "}
                        <a href="http://www.dummy.restapiexample.com/">
                            Dummy sample REST API
                        </a>
                    </p>
                </div>
            </footer>
        </>
    );
}

export default App;
