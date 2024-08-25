import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [carNumber, setCarNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/addCar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ carNumber, ownerName }),
    });
    
    if (response.ok) {
      alert('Car added successfully!');
      setCarNumber('');
      setOwnerName('');
    } else {
      alert('Error adding car');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Car Registry</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value.replace(/\D/g, ''))}
          placeholder="Car Number"
          required
        />
        <input
          type="text"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          placeholder="Owner Name"
          required
        />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}
