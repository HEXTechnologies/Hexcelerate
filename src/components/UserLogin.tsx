"use client";

import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, firestore } from "../../firebaseConfig/firebase";
import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

const RegisterAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
};
