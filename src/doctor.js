export class Doctor
{
  constructor(firstName, lastName, imageUrl)
  {
    this.firstName = firstName;
    this.lastName = lastName;
    this.imageUrl = imageUrl;
    this.practices = [];
  }

  addPractice(practice)
  {
    this.practices.push(practice);
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
