export class Doctor
{
  constructor(firstName, lastName)
  {
    this.firstName = firstName;
    this.lastName = lastName;
    this.practices = [];
  }

  addPractice(practice)
  {
    this.parcticies.push(practice);
  }
}

export class Practice
{
  constructor(name, address, newPatients)
  {
    this.name = name;
    this.address = address;
    this.newPatients = newPatients;
    this.phones = [];
  }

  addPhone(phone)
  {
    this.phones.push(phone);
  }

}
