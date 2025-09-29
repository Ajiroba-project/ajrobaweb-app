import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

interface SaveBeneficiaryParams {
  number: string
  biller: string
  type: 'airtime' | 'data' | 'electricity' | 'cable'
}

interface SaveBeneficiaryResponse {
  message: string
  beneficiary: {
    id: string
    user: string
    number: string
    biller: string
    type: string
  }
}

// Global state for save beneficiary status
let globalSaveStatus = {
  isLoading: false,
  isSaved: false,
  error: null as string | null,
  savedBeneficiaries: new Set<string>() // Track saved beneficiaries by key
}

// Listeners for state changes
const listeners = new Set<() => void>()

const notifyListeners = () => {
  listeners.forEach(listener => listener())
}

export const useSaveBeneficiary = () => {
  const [isLoading, setIsLoading] = useState(globalSaveStatus.isLoading)
  const [isSaved, setIsSaved] = useState(globalSaveStatus.isSaved)
  const [error, setError] = useState<string | null>(globalSaveStatus.error)

  // Sync with global state
  useEffect(() => {
    const updateState = () => {
      setIsLoading(globalSaveStatus.isLoading)
      setIsSaved(globalSaveStatus.isSaved)
      setError(globalSaveStatus.error)
    }

    listeners.add(updateState)
    updateState()

    return () => {
      listeners.delete(updateState)
    }
  }, [])

  const saveBeneficiary = async (params: SaveBeneficiaryParams): Promise<boolean> => {
    // Create a unique key for this beneficiary
    const beneficiaryKey = `${params.number}-${params.biller}-${params.type}`
    
    // Check if already saved
    if (globalSaveStatus.savedBeneficiaries.has(beneficiaryKey)) {
      globalSaveStatus.isSaved = true
      notifyListeners()
      return true
    }

    // Update global state
    globalSaveStatus.isLoading = true
    globalSaveStatus.error = null
    notifyListeners()

    try {
      const token = Cookies.get('token')
      
      if (!token) {
        globalSaveStatus.error = 'Authentication token not found'
        globalSaveStatus.isLoading = false
        notifyListeners()
        return false
      }

      const response = await fetch('/api/save_beneficiary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(params)
      })

      const data = await response.json()

      if (!response.ok) {
        globalSaveStatus.error = data.message || 'Failed to save beneficiary'
        globalSaveStatus.isLoading = false
        notifyListeners()
        return false
      }

      // Mark as saved
      globalSaveStatus.savedBeneficiaries.add(beneficiaryKey)
      globalSaveStatus.isSaved = true
      globalSaveStatus.isLoading = false
      notifyListeners()
      return true

    } catch (err) {
      globalSaveStatus.error = 'Network error occurred'
      globalSaveStatus.isLoading = false
      notifyListeners()
      return false
    }
  }

  const removeBeneficiary = async (params: SaveBeneficiaryParams): Promise<boolean> => {
    const beneficiaryKey = `${params.number}-${params.biller}-${params.type}`

    if (!globalSaveStatus.savedBeneficiaries.has(beneficiaryKey)) {
      return true
    }

    globalSaveStatus.isLoading = true
    globalSaveStatus.error = null
    notifyListeners()

    try {
      const token = Cookies.get('token')
      if (!token) {
        globalSaveStatus.error = 'Authentication token not found'
        globalSaveStatus.isLoading = false
        notifyListeners()
        return false
      }

      const response = await fetch('/api/remove_beneficiary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(params)
      })

      const data = await response.json()

      if (!response.ok) {
        globalSaveStatus.error = data.message || 'Failed to remove beneficiary'
        globalSaveStatus.isLoading = false
        notifyListeners()
        return false
      }

      globalSaveStatus.savedBeneficiaries.delete(beneficiaryKey)
      globalSaveStatus.isSaved = false
      globalSaveStatus.isLoading = false
      notifyListeners()
      return true
    } catch (err) {
      globalSaveStatus.error = 'Network error occurred'
      globalSaveStatus.isLoading = false
      notifyListeners()
      return false
    }
  }

  const reset = () => {
    globalSaveStatus.isSaved = false
    globalSaveStatus.error = null
    globalSaveStatus.savedBeneficiaries.clear()
    notifyListeners()
  }

  const isBeneficiarySaved = (params: SaveBeneficiaryParams): boolean => {
    const beneficiaryKey = `${params.number}-${params.biller}-${params.type}`
    return globalSaveStatus.savedBeneficiaries.has(beneficiaryKey)
  }

  return {
    saveBeneficiary,
    removeBeneficiary,
    isLoading,
    isSaved,
    error,
    reset,
    isBeneficiarySaved
  }
}
