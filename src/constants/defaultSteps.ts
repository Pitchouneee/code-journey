import type { Step } from '../types';

export const DEFAULT_STEPS: Step[] = [
    {
        id: 1,
        title: 'Step 1',
        code: `public class User {
    private String name;

    public User(String name) {
        this.name = name;
    }
}`
    },
    {
        id: 2,
        title: 'Step 2',
        code: `public class User {
    private String name;
    private String email;

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }
}`
    },
    {
        id: 3,
        title: 'Step 3',
        code: `public class Person {
    private String name;
    private String email;

    public Person(String name, String email) {
        this.name = name;
        this.email = email;
    }
}`
    },
    {
        id: 4,
        title: 'Step 4',
        code: `public class Person {
    private String name;
    private String email;

    public Person(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getEmail() {
        return this.email;
    }
}`
    }
];
