import "mocha";
import { expect } from "chai";
import { Subordinates } from "../src";
import { rolesInput, usersInput} from "./sampleinput";

describe("Get user's subordinates by user id", () => {
    const subordinate = new Subordinates();
    subordinate.setRoles(rolesInput);
    subordinate.setUsers(usersInput);

    it("Admin(user id 1) should return all four subordinates", () => {
        const adminSubordinates = subordinate.getSubOrdinates(1);
        expect(adminSubordinates).to.have.lengthOf(4);
        expect(adminSubordinates).to.deep.include.members([{ Id: 4, Name: "Mary Manager", Role: 2 }]);
    });

    it("Supervisor(user id 3) should return two subordinates", () => {
        const supervisorSubordinates = subordinate.getSubOrdinates(3);
        expect(supervisorSubordinates).to.have.lengthOf(2);
        expect(supervisorSubordinates).to.deep.include.members([{ Id: 2, Name: "Emily Employee", Role: 4 }]);
    });

    it("Employee(user id 2) should return empty list", () => {
        const employeeSubordinates = subordinate.getSubOrdinates(2);
        expect(employeeSubordinates).to.be.empty;
    });

    it("Invalid user should return USER NOT FOUND", () => {
        try {
            const noUser = subordinate.getSubOrdinates(123);
        } catch(err) {
            expect(err.message).to.eql('USER NOT FOUND');
        }
    });
});
