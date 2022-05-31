export interface RegistrationData {
  name?: string;
  telephone?: string;
  email?: string;
  gender?: 'male' | 'female';
  comingWithOthers?:
    | 'Please select'
    | 'Just myself'
    | "I'm bringing some colleagues";
  countOnYou?: boolean;
}
