export const useAuth = () => {
  const signInWithGoogle = () => alert('Mock Google Sign-In');
  const signInAnonymously = () => alert('Mock Guest Sign-In');
  return { signInWithGoogle, signInAnonymously };
};
