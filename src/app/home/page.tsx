'use client'
import React, { useState } from 'react'

function App() {
  const [players, setPlayers] = useState([])
  const [newPlayerName, setNewPlayerName] = useState('')
  const [transferTo, setTransferTo] = useState('')
  const [transferAmount, setTransferAmount] = useState('')

  const handleAddPlayer = () => {
    if (newPlayerName.trim() !== '') {
      setPlayers([...players, { name: newPlayerName, balance: 1500 }])
      setNewPlayerName('')
    }
  }

  const handleTransfer = (index) => {
    const amount = parseInt(transferAmount)
    const receiverIndex = players.findIndex(
      (player) => player.name === transferTo
    )

    if (
      amount > 0 &&
      amount <= players[index].balance &&
      receiverIndex !== -1
    ) {
      const updatedPlayers = [...players]
      updatedPlayers[index].balance -= amount
      updatedPlayers[receiverIndex].balance += amount
      setPlayers(updatedPlayers)
      setTransferTo('')
      setTransferAmount('')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Banco Imobiliário</h1>

      {/* Adicionar jogador */}
      <div className="mb-4">
        <input
          type="text"
          className="mr-2 p-2 border border-gray-300"
          placeholder="Nome do jogador"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleAddPlayer}
        >
          Adicionar jogador
        </button>
      </div>

      {/* Lista de jogadores */}
      <div className="grid grid-cols-2 gap-4">
        {players.map((player, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded">
            <h2 className="font-semibold">{player.name}</h2>
            <p>Saldo: ${player.balance}</p>
            <div className="mt-2">
              <select
                className="mr-2 p-2 border border-gray-300"
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
              >
                <option value="">Selecione o destinatário</option>
                {players.map((p, i) => (
                  <option key={i} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="mr-2 p-2 border border-gray-300"
                placeholder="Valor"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
              />
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={() => handleTransfer(index)}
              >
                Transferir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
