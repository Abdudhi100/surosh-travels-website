// import { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../lib/supabaseClient";

// interface AuthContextType {
//   user: any;
//   loading: boolean;
//   signOut: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data } = await supabase.auth.getUser();
//       setUser(data?.user || null);
//       setLoading(false);
//     };
//     fetchUser();

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user || null);
//     });

//     return () => listener.subscription.unsubscribe();
//   }, []);

//   const signOut = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// }
