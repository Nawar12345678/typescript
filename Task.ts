///<reference lib = "es2015" />
class Contact {
    name: string;
    email: string;
    phone: string;
    group: string; // Added group parameter

    constructor(name: string, email: string, phone: string, group: string) { // Added group parameter
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.group = group;
    }
}

type Tcontact = { name: string; email: string; phone: string; group:string }

class AddressBook {
    contacts: Contact[] = [];

    addContact: (contact: Tcontact) => any = (contact) => {

        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contact.email)) {
            throw new Error("Invalid email format");
        }

        // Name validation (example - check for empty name)
        if (!contact.name || contact.name.trim() === "") {
            throw new Error("Name cannot be empty");
        }

        // You can add further validations for phone number format, etc.

        this.contacts.push(contact);
    }

    findContactByName: (name: string) => any = (name) => {
        return this.contacts.find((contact) => contact.name === name);
    }

    filterByGroup(group:string) {
        return this.contacts.filter((contact) => contact.group === group);
    }

    sortByName(): void {
        this.contacts.sort((a: any, b: any) => a.name.localeCompare(b.name));
    }

    // New functionalities:
    // 1. Validate various contact properties on addition (already implemented)
    // 2. Search contacts by name (partial match)

    searchContacts(searchTerm: string): Contact[] {
        const normalizedSearchTerm = searchTerm.toLowerCase();
        return this.contacts.filter((contact) =>
            contact.name.toLowerCase().includes(normalizedSearchTerm)
        );
    }


    printContacts(): void {
        for (const contact of this.contacts) {
            console.log(`Name: ${contact.name}`);
            console.log(`Email: ${contact.email}`);
            console.log(`Phone: ${contact.phone}`);
            console.log(`Group: ${contact.group}`);
            console.log("-----");
        }
    }
}

const addressBook = new AddressBook();

const contact1 = new Contact("John Doe", "johndoe@example.com", "123-456-7890", "Group1");
const contact2 = new Contact("Alice Smith", "alice.smith@invalid", "456-789-0123", "Group2"); 
const contact3 = new Contact("", "valid@email.com", "789-012-3456", "Group3"); 

addressBook.addContact(contact1);

try {
    addressBook.addContact(contact2); // This will throw an error (invalid email)
    addressBook.addContact(contact3); // This will throw an error (empty name)
} catch (error) {
    if (typeof error === 'object' && error !== null) {
        console.error("Error adding contact:", (error as Error).message);
    } else {
        console.error("An unknown error occurred.");
    }
}

console.log("Contacts:");
addressBook.printContacts();

// Example usage of new search functionality
const searchResults = addressBook.searchContacts("john");
console.log("Search results (name containing 'john'):");
searchResults.forEach((contact) => console.log(`  - ${contact.name}`));
