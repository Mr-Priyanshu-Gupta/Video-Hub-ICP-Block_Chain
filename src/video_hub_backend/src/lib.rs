// use ic_cdk::query;

// #[query]
// fn hello_world() -> String {
//     "Hello Priyanshu".to_string()
//  }
use candid::{candid_method, Principal};
use ic_cdk::api::time;
use ic_cdk_macros::*;
use std::collections::HashMap;
use std::cell::RefCell;

/// Struct to represent a user
#[derive(candid::CandidType, Clone)]
struct User {
    id: Principal,
    username: String,
    email: String,
    password: String,
    created_at: u64,
}

/// Store users by Principal ID
thread_local! {
    static USERS: RefCell<HashMap<Principal, User>> = RefCell::new(HashMap::new());
}

/// Sign up a new user
#[update]
#[candid_method(update)]
fn signup(username: String, email: String, password: String) -> String {
    let caller = ic_cdk::caller();

    USERS.with(|users| {
        let mut map = users.borrow_mut();

        if map.contains_key(&caller) {
            return "⚠️ User already signed up.".to_string();
        }

        let user = User {
            id: caller,
            username,
            email,
            password,
            created_at: time(),
        };

        map.insert(caller, user);
        "✅ Signup successful!".to_string()
    })
}

/// Login with email and password
#[query]
#[candid_method(query)]
fn login(email: String, password: String) -> String {
    let caller = ic_cdk::caller();

    USERS.with(|users| {
        for user in users.borrow().values() {
            if user.email == email && user.password == password {
                if user.id == caller {
                    return "✅ Login successful!".to_string();
                } else {
                    return "❌ Invalid identity.".to_string();
                }
            }
        }
        "❌ Invalid credentials.".to_string()
    })
}

/// Returns the caller's Principal
#[query]
#[candid_method(query)]
fn whoami() -> Principal {
    ic_cdk::caller()
}
