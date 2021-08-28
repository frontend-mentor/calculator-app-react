import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <div className="header">
          <div className="title">calc</div>
          <ThemeSelector onSwitchTheme={setTheme} />
        </div>
        <input className="expression" readOnly={true} defaultValue={'399,981'} />
        <KeyPad />
      </div>
    </div>
  );
}

function ThemeSelector(props: { onSwitchTheme: (theme: string) => void }) {
  const availableThemes = ['light', 'dark', 'intense'];
  const [switchValue, setSwitchValue] = useState(0);

  const onSwitch = (value: number) => {
    setSwitchValue(value);
  };

  useEffect(() => {
    props.onSwitchTheme(availableThemes[switchValue % availableThemes.length]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchValue, props.onSwitchTheme]);

  return (
    <div className="theme-selector">
      <span className="label">THEME</span>
      <div className="numbers">
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>
      <div className="switch-wrapper">
        <Switch value={switchValue} onToggle={onSwitch} />
      </div>
    </div>
  );
}

function Switch(props: { value: number; onToggle: (value: number) => void }) {
  return (
    <div className="switch">
      {[0, 1, 2].map((value) => {
        return (
          <button
            key={value}
            className={classNames('toggle', { active: value === props.value })}
            onClick={() => props.onToggle(value)}
          />
        );
      })}
    </div>
  );
}

function KeyPad() {
  const keys = [
    { key: '7' },
    { key: '8' },
    { key: '9' },
    { key: 'del', className: 'del-key' },

    { key: '4' },
    { key: '5' },
    { key: '6' },
    { key: '+', className: 'add-key' },

    { key: '1' },
    { key: '2' },
    { key: '3' },
    { key: '-', className: 'sub-key' },

    { key: '.', className: 'dot-key' },
    { key: '0' },
    { key: '/', className: 'div-key' },
    { key: '×', className: 'mul-key' },

    { key: 'reset', className: 'reset-key' },
    { key: '=', className: 'equal-key' },
  ];
  return (
    <div className="keypad">
      {keys.map((item) => (
        <button key={item.key} className={`key ${item.className || ''}`}>
          {item.key}
        </button>
      ))}
    </div>
  );
}

export default App;
