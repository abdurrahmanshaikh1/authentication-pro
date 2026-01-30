const fetchProfile = async () => {
  try {
    setLoading(true);
    const response = await fetch('http://localhost:3000/api/profile', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Profile fetch failed');
    }

    const userData = await response.json();
    
    if (!userData.isVerified) {
      navigate('/login');
      return;
    }
    
    setUser(userData);
  } catch (error) {
    console.error('Profile fetch error:', error);
    navigate('/login');
  } finally {
    setLoading(false);
  }
};
