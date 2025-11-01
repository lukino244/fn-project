import React, { useState, useMemo, useCallback } from 'react'
import Button from '../components/ui/Button.jsx'
import { useBasket } from '../context/BasketContext.jsx'

// --- სტილები ---
// ყველა სტილი გამოტანილია კონსტანტებად, რომ არ შეიქმნას ხელახლა ყოველ რენდერზე
const inputStyle = {
  padding: 12,
  borderRadius: 8,
  border: '1px solid #ddd',
  width: '100%',
  boxSizing: 'border-box',
}
const successContainerStyle = {
  display: 'grid',
  placeItems: 'center',
  padding: '3rem 0',
}
const successContentStyle = { textAlign: 'center' }
const successMessageStyle = { color: '#666' }
const layoutStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 380px',
  gap: 24,
}
const formStyle = { display: 'grid', gap: 16 }
const sectionStyle = {
  background: '#fff',
  border: '1px solid #eee',
  borderRadius: 12,
  padding: 16,
}
const sectionTitleStyle = { marginTop: 0, marginBottom: 12 }
const gridStyle = { display: 'grid', gap: 10 }
const gridHalvesStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 10,
}
const summaryStyle = {
  border: '1px solid #eee',
  borderRadius: 12,
  padding: 16,
  height: 'fit-content',
  background: '#fff',
}
const summaryItemsStyle = { display: 'flex', flexDirection: 'column', gap: 8 }
const summaryItemRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
}
const summaryItemNameStyle = { color: '#333' }
const summaryItemPriceStyle = { fontWeight: 600 }
const summaryTotalRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 12,
  paddingTop: 12,
  borderTop: '1px solid #eee',
  fontWeight: 800,
}
// --- სტილების დასასრული ---

// ---
// 1. შევქმენით შეკვეთის ბარათის ც