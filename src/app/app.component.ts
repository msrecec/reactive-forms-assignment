import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  status = ["stable", "critical", "finished"];
  signupForm: FormGroup;
  forbiddenNames = ["Test"];
  valid: boolean = false;

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      projectData: new FormGroup({
        name: new FormControl(null, [
          Validators.required,
          this.forbiddenNamesFn.bind(this),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      status: new FormControl("stable"),
    });

    this.signupForm.statusChanges.subscribe((value) => {
      if (value == "VALID") {
        this.valid = true;
      } else {
        this.valid = false;
      }
    });
  }

  forbiddenNamesFn(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }
}
