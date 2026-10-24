package com.finance.transaction;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class TransactionService {

    private final TransactionRepository repository;

    public TransactionService(TransactionRepository repository) {
        this.repository = repository;
    }

    public FinancialTransaction create(FinancialTransaction transaction) {
        transaction.setId(null); // Clients must not choose the database ID.
        return repository.save(transaction);
    }

    @Transactional(readOnly = true)
    public List<FinancialTransaction> getAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public FinancialTransaction getById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Transaction not found with id: " + id));
    }

    public FinancialTransaction update(Long id, FinancialTransaction request) {
        FinancialTransaction existing = getById(id);
        existing.setDescription(request.getDescription());
        existing.setAmount(request.getAmount());
        existing.setType(request.getType());
        existing.setCategory(request.getCategory());
        existing.setTransactionDate(request.getTransactionDate());
        return repository.save(existing);
    }

    public void delete(Long id) {
        FinancialTransaction existing = getById(id);
        repository.delete(existing);
    }
}
