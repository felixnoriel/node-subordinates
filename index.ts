import { Subordinates } from "./src";
import { rolesInput, usersInput} from "./tests/sampleinput";

const subordinate = new Subordinates();
subordinate.setRoles(rolesInput);
subordinate.setUsers(usersInput);

const supervisorSubordinates = subordinate.getSubOrdinates(3);
const adminSubordinates = subordinate.getSubOrdinates(1);
const employeeSubordinates = subordinate.getSubOrdinates(2);

console.log('supervisor subordinates', supervisorSubordinates);
console.log('admin subordinates', adminSubordinates);
console.log('employee subordinates', employeeSubordinates);

try {
    const nonExistingUser = subordinate.getSubOrdinates(123);
} catch (err) {
    console.log('user not exist', err.message);
}
