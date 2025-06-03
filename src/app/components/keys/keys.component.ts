import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../../store';
import { ApiKey } from '../../store/apiKey/apiKey.model';
import * as ApiKeyActions from '../../store/apiKey/apiKey.actions';
import * as ApiKeySelectors from '../../store/apiKey/apiKey.selectors';
import * as AuthSelectors from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-keys',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './keys.component.html',
})
export class KeysComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  apiKeys$: Observable<ApiKey[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  userId$: Observable<string | null>;

  createKeyForm: FormGroup;
  showCreateForm = false;
  showDeleteConfirm = false;
  keyToDelete: ApiKey | null = null;
  
  // Object to track visibility state of each API key, using key ID as the property
  showFullKey: { [key: string]: boolean } = {};
  
 availableServices = [
  {
    id: 1,
    name: 'Directions API',
    description: 'Provides turn-by-turn navigation and route instructions optimized for driving, walking, or cycling.'
  },
  {
    id: 2,
    name: 'Matrix API',
    description: 'Calculates travel time and distance between multiple origins and destinations in a single request.'
  },
  {
    id: 3,
    name: 'Geocoding API',
    description: 'Converts physical addresses into geographic coordinates (latitude and longitude).'
  },
  {
    id: 4,
    name: 'Isochrone API',
    description: 'Generates polygons that represent reachable areas within a specific travel time or distance from a point.'
  }
];


  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.apiKeys$ = this.store.select(ApiKeySelectors.selectApiKeys);
    this.loading$ = this.store.select(ApiKeySelectors.selectApiKeyLoading);
    this.error$ = this.store.select(ApiKeySelectors.selectApiKeyError);
    this.userId$ = this.store.select(AuthSelectors.selectUserId);

    this.createKeyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      expiresInDays: [90, [Validators.min(1), Validators.max(365)]],
      permissions: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId$.pipe(takeUntil(this.destroy$)).subscribe(userId => {
      if (userId) {
        this.store.dispatch(ApiKeyActions.loadUserApiKeys({ userId: parseInt(userId) }));
      }
    });
    // Initialize showFullKey state for each API key when loaded
    this.apiKeys$.pipe(takeUntil(this.destroy$)).subscribe(keys => {
      keys.forEach(key => {
        if (!(key.id in this.showFullKey)) {
          this.showFullKey[key.id] = false;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      this.createKeyForm.reset({
        name: '',
        expiresInDays: 90,
        permissions: []
      });
    }
  }

  onPermissionChange(serviceId: number, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const currentPermissions = this.createKeyForm.get('permissions')?.value || [];
    
    if (checkbox.checked) {
      this.createKeyForm.patchValue({
        permissions: [...currentPermissions, serviceId]
      });
    } else {
      this.createKeyForm.patchValue({
        permissions: currentPermissions.filter((id: number) => id !== serviceId)
      });
    }
  }

  onSubmit(): void {
    if (this.createKeyForm.valid) {
      this.userId$.pipe(takeUntil(this.destroy$)).subscribe(userId => {
        if (userId) {
          const formValue = this.createKeyForm.value;
          this.store.dispatch(ApiKeyActions.createApiKey({
            userId: parseInt(userId),
            name: formValue.name,
            expiresInDays: formValue.expiresInDays,
            permissions: formValue.permissions
          }));
          this.toggleCreateForm();
        }
      });
    }
  }

  confirmDelete(apiKey: ApiKey): void {
    this.keyToDelete = apiKey;
    this.showDeleteConfirm = true;
  }

  deleteApiKey(): void {
    if (this.keyToDelete) {
      this.store.dispatch(ApiKeyActions.deleteApiKey({ keyId: this.keyToDelete.id }));
      this.cancelDelete();
    }
  }

  cancelDelete(): void {
    this.keyToDelete = null;
    this.showDeleteConfirm = false;
  }

  toggleKeyStatus(apiKey: ApiKey): void {
    this.store.dispatch(ApiKeyActions.updateApiKey({
      keyId: apiKey.id,
      updateData: { is_active: !apiKey.is_active }
    }));
  }

  // Method to toggle the visibility of a specific API key
  toggleKeyVisibility(keyId: number): void {
    this.showFullKey[keyId] = !this.showFullKey[keyId];
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log('API key copied to clipboard');
    });
  }

  isExpired(expiresAt: string | null): boolean {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  }

  getExpirationStatus(expiresAt: string | null): string {
    if (!expiresAt) return 'Never expires';
    
    const expirationDate = new Date(expiresAt);
    const now = new Date();
    const diffTime = expirationDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Expires today';
    if (diffDays === 1) return 'Expires tomorrow';
    if (diffDays <= 7) return `Expires in ${diffDays} days`;
    if (diffDays <= 30) return `Expires in ${Math.ceil(diffDays / 7)} weeks`;
    return `Expires in ${Math.ceil(diffDays / 30)} months`;
  }

  getServiceName(apiId: number): string {
    const service = this.availableServices.find(s => s.id === apiId);
    return service ? service.name : `Service ${apiId}`;
  }

  clearError(): void {
    this.store.dispatch(ApiKeyActions.clearApiKeyError());
  }
}