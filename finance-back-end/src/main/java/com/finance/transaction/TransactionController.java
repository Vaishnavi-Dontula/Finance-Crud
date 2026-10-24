package com.finance.transaction;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FinancialTransaction create(@Valid @RequestBody FinancialTransaction request) {
        return service.create(request);
    }

    @GetMapping
    public List<FinancialTransaction> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public FinancialTransaction getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public FinancialTransaction update(@PathVariable Long id,
                                       @Valid @RequestBody FinancialTransaction request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
