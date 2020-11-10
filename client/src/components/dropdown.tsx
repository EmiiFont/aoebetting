import React, { useState } from 'react';

export default function CharacterDropDown(props: any) {
    const [value, setValue] = useState('');
    const items = props.items;
    return (
      <select
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      >
      {items.map(({ label, value }: any) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
      </select>
    );
  }