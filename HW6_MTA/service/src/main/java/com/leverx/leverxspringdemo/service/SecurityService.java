package com.leverx.leverxspringdemo.service;

import org.springframework.stereotype.Service;

import com.sap.cloud.sdk.cloudplatform.security.Authorization;
import com.sap.cloud.sdk.cloudplatform.security.user.UserAccessor;
import com.sap.cloud.sdk.s4hana.connectivity.exception.AccessDeniedException;


@Service
public class SecurityService {
	public void userHasAuthorization(String authorization) throws AccessDeniedException {
		if (!UserAccessor.getCurrentUser().hasAuthorization(new Authorization(authorization))) {
			throw new AccessDeniedException("User action is not permitted! Insufficient privilege!");
		}
	}

}
