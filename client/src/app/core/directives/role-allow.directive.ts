import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {intersection} from 'lodash-es';
import {AuthService} from "../../services/auth.service";

@Directive({
  selector: '[aghRoleAllow]',
})
export class RoleAllowDirective implements OnInit, OnDestroy {
  private allowedRoles: string[];
  private userRoles: string[];
  private onDestroy$ = new Subject<boolean>();
  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly containerRef: ViewContainerRef,
    private readonly authService: AuthService,
  ) { }

  @Input()
  set aghRoleAllow(allowedRoles: string[]) {
    this.allowedRoles = allowedRoles;
  }

  ngOnInit() {
    this.authService.user
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(user => {
        this.userRoles = user?.roles ?? [];
        this.checkIfUserAllowed();
      })
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  checkIfUserAllowed() {
    if (!this.allowedRoles || !this.allowedRoles.length || !this.userRoles.length) {
      this.containerRef.clear();
      return;
    }

    const isUserAllowed = intersection(this.allowedRoles, this.userRoles).length > 0;

    if (isUserAllowed) {
      this.containerRef.createEmbeddedView(this.templateRef);
      return;
    }
    this.containerRef.clear();
  }
}
